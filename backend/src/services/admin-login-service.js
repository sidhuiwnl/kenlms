import db from "../config/db.js";

export async function adminLogin(loginData) {
  const { username, password } = loginData;

  const [rows] = await db.execute(
    `SELECT * FROM web_admin_login WHERE username = ? AND password = ?`,
    [username, password]
  );

 
  if (rows.length > 0) {
    return { success: true, admin: rows[0] };
  }


  return { success: false, message: "Invalid credentials" };
}
