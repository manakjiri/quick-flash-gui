use quick_flash::{credentials::Credentials, credentials_manager::CredentialsManager, BaseDirs};

#[tauri::command]
fn my_custom_command() {
    println!("I was invoked from JavaScript!");
}

#[tauri::command]
fn get_all_storage_credentials(
    creds: tauri::State<CredentialsManager>,
) -> Result<Vec<Credentials>, String> {
    creds.get_all().map_err(|e| e.to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let dirs = BaseDirs::new().expect("Failed to initialize base directories");
    let creds = CredentialsManager::new(dirs.creds_dir.clone());

    tauri::Builder::default()
        .manage(dirs)
        .manage(creds)
        .invoke_handler(tauri::generate_handler![my_custom_command])
        .invoke_handler(tauri::generate_handler![get_all_storage_credentials])
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
