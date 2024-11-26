use std::env;

use quick_flash::{
    credentials::Credentials, credentials_manager::CredentialsManager, storage::Storage, BaseDirs,
};
use serde::{Deserialize, Serialize};

use tauri::{State, Builder};
use tauri::plugin::log::Builder as LogBuilder;
use quick_flash::{credentials::CredentialsManager, storage::Storage, BaseDirs};

const ERR_STORAGE_CONNECT: &str = "Failed to connect to storage using provided credentials";
const ERR_STORAGE_ADD: &str = "Failed to add storage credentials";
const ERR_STORAGE_REMOVE: &str = "Failed to remove storage credentials";

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct ProgressState {
    pub progress: u32,
}

impl ProgressState {
    pub fn new() -> Self {
        ProgressState { progress: 0 }
    }

    pub fn set_progress(&mut self, progress: u32) {
        self.progress = progress;
    }

    pub fn get_progress(&self) -> u32 {
        self.progress
    }
}

// Command to set progress
#[tauri::command]
fn set_progress(progress: u32, progress_state: tauri::State<'_, ProgressState>) {
    let mut progress_state = progress_state.lock().unwrap();
    progress_state.set_progress(progress);
}

// Command to get progress
#[tauri::command]
fn get_progress(progress_state: tauri::State<'_, ProgressState>) -> u32 {
    let progress_state = progress_state.lock().unwrap();
    progress_state.get_progress()
}



#[tauri::command]
fn get_all_storage_credentials(
    creds: tauri::State<CredentialsManager>,
) -> Result<Vec<Credentials>, String> {
    creds.get_all().map_err(|e| e.to_string())
}

#[tauri::command]
fn new_storage_credentials(
    manager: tauri::State<CredentialsManager>,
    user_storage_name: String,
    storage_name: String,
    storage_account_id: String,
    storage_access_key: String,
    storage_secret_key: String,
) -> Result<(), String> {
    let creds = Credentials::new_r2(
        user_storage_name,
        storage_name,
        storage_account_id,
        storage_access_key,
        storage_secret_key,
    );
    /* try to add the credentials,
    this may fail if the user_storage_name is found among the already saved */
    manager
        .add(creds)
        .map_err(|e| format!("{}: {}", ERR_STORAGE_ADD, e.to_string()))?;
    Ok(())
}

#[tauri::command]
fn check_storage_credentials(
    user_storage_name: String,
    storage_name: String,
    storage_account_id: String,
    storage_access_key: String,
    storage_secret_key: String,
) -> Result<(), String> {
    let creds = Credentials::new_r2(
        user_storage_name,
        storage_name,
        storage_account_id,
        storage_access_key,
        storage_secret_key,
    );
    Storage::new(&creds)
        .map_err(|e| format!("{}: {}", ERR_STORAGE_CONNECT, e.to_string()))?
        .is_available()
        .map_err(|e| format!("{}: {}", ERR_STORAGE_CONNECT, e.to_string()))?;
    Ok(())
}

#[tauri::command]
fn remove_storage_credentials(
    manager: tauri::State<CredentialsManager>,
    user_storage_name: String,
) -> Result<(), String> {
    manager
        .remove(&user_storage_name)
        .map_err(|e| format!("{}: {}", ERR_STORAGE_REMOVE, e.to_string()))
}

fn get_credentials(
    manager: &CredentialsManager,
    user_storage_name: &str,
) -> Result<Credentials, String> {
    manager
        .get_all()
        .map_err(|e| e.to_string())?
        .into_iter()
        .find(|c| c.user_storage_name == user_storage_name)
        .ok_or_else(|| "Credentials not found".to_string())
}

#[derive(Serialize, Deserialize, Debug)]
pub struct FirmwareName {
    pub name: String,
    /// unix timestamp in seconds
    pub last_modified: i64,
}

#[tauri::command]
fn get_firmware_names(
    manager: tauri::State<CredentialsManager>,
    user_storage_name: String,
) -> Result<Vec<FirmwareName>, String> {
    let creds = get_credentials(&manager, &user_storage_name)?;
    let storage = Storage::new(&creds).map_err(|e| e.to_string())?;
    let firmware_names = storage
        .list_firmwares()
        .map_err(|e| e.to_string())?
        .into_iter()
        .map(|f| FirmwareName {
            name: f.name,
            last_modified: f.last_modified,
        })
        .collect();
    Ok(firmware_names)
}

#[derive(Serialize, Deserialize, Debug)]
pub struct FirmwareVersion {
    pub version: String,
    /// unix timestamp in seconds
    pub last_modified: i64,
}

#[tauri::command]
fn get_firmware_versions(
    manager: tauri::State<CredentialsManager>,
    user_storage_name: String,
    firmware_name: String,
) -> Result<Vec<FirmwareVersion>, String> {
    let creds = get_credentials(&manager, &user_storage_name)?;
    let storage = Storage::new(&creds).map_err(|e| e.to_string())?;
    let firmware_versions = storage
        .list_firmware_versions(&firmware_name)
        .map_err(|e| e.to_string())?
        .into_iter()
        .map(|f| FirmwareVersion {
            version: f.version,
            last_modified: f.last_modified,
        })
        .collect();
    Ok(firmware_versions)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // the scaling is broken if this is set to 1
    unsafe { env::set_var("GTK_USE_PORTAL", "0") }

    let dirs = BaseDirs::new().expect("Failed to initialize base directories");
    let creds = CredentialsManager::new(dirs.creds_dir.clone());

    tauri::Builder::default()
        .manage(dirs)
        .manage(creds)
        .manage(ProgressState::new())
        .invoke_handler(tauri::generate_handler![get_all_storage_credentials])
        .invoke_handler(tauri::generate_handler![new_storage_credentials])
        .invoke_handler(tauri::generate_handler![check_storage_credentials])
        .invoke_handler(tauri::generate_handler![remove_storage_credentials])
        .invoke_handler(tauri::generate_handler![get_firmware_names])
        .invoke_handler(tauri::generate_handler![get_firmware_versions])
        .invoke_handler(tauri::generate_handler![get_progress])
        .invoke_handler(tauri::generate_handler![set_progress])
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
