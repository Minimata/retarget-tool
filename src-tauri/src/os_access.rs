#[tauri::command]
pub fn select_folder() -> String {
    format!("Hello! You've been greeted from OS Access in Rust!")
}
