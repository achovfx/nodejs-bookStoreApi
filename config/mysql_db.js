


const getUsers = async () => {
    const [result] = await db.query('SELECT * FROM users');
    return result;
}

const getUser = async (id) => {
    const result = await db.query(`SELECT * FROM users WHERE id=?`, [id]);
    
    return result[0];
}

const insertUser = async (username,email,password) => {
    const [result] = await db.query(`INSERT into users (username,email,password) values (?, ?, ?)`, [username, email, password]);
    return {id: result.insertId, username,email,password};
}

const updateUser = async (id,username,email,password) => {
    const [result] = await db.query(`update users set username=?, email=?, password=? WHERE id=?`, [username, email, password, id]);
    return getUser(id);
}

const deleteUser = async (id) => {
    const [result] = await db.query(`DELETE FROM users WHERE id=?`, [id]);
    return `ID:${id} Account Deleted successfully.`;
}

deleteUser(5).then((res) => console.log(res))