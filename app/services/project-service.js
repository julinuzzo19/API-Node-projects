const sql = require('../config/config');

module.exports = {
  create: async (data, users, result) => {
    let user_projects = [];
    console.log(data)
    await sql.query('INSERT INTO projects SET ?', data, async (err, res) => {
      if (err) {
        result(err, null);
        return;
      } else {
        if (users) {
          users.forEach((element) => {
            user_projects.push([res.insertId, element]);
          });
          await sql.query(
            'INSERT INTO users_projects (project_id, user_id) VALUES ?',
            [user_projects]
          );
        }

        result(null, { id: res.insertId, ...data });
      }
    });
  },

  getById: async (id, result) => {
    await sql.query('select * from projects where id = ?', id, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      if (res.length > 0) {
        result(null, res);
      } else {
        result(null, null);
      }
    });
  },

  remove: async (id, result) => {
    await sql.query('delete from projects where id = ?', id, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      if (res.affectedRows > 0) {
        result(null, res);
      } else {
        result(null, null);
      }
    });
  },

  update: async (id, project, result) => {
    await sql.query(
      'update projects set ? where id = ?',
      [project, id],
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        if (res.affectedRows > 0) {
          result(null, { id, ...project });
        } else {
          result(null, null);
        }
      }
    );
  },
  getAll: async (name, limit, startIndex, result) => {
    let query = `select * from projects`;
    if (name) {
      query += ` where name like '%${name}%'`;
    }
    query += ` limit ${startIndex},${limit}`;
    await sql.query(query, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, res);
    });
  }
};
