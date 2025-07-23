import { connection } from '../session.js';

export function getCategories(request, response) {
  const query = `SELECT * FROM categories`;

  connection.all(query, (err, rows) => {
    if (err) {
      response.status(500).json({ error: err.message });
      return;
    }

    response.status(200).json(rows);
  });
}

export function createCategory(request, response) {
  const { name } = request.body;

  const mutation = `INSERT INTO categories (name) VALUES (?)`;

  connection.run(mutation, [name], (err, rows) => {
    if (err) {
      response.status(500).json({ error: err.message });
      return;
    }

    response.status(200).json({ message: 'category added' });
  });
}

export function deleteCategory(request, response) {
  const { id } = request.params;

  const mutation = `DELETE FROM categories WHERE id=(?)`;

  connection.run(mutation, id, (err, rows) => {
    if (err) {
      response.status(500).json({ error: err.message });
      return;
    }

    response.status(200).json({ message: 'category deleted', deletedId: id });
  });
}
