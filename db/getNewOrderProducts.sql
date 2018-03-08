SELECT n.id, p.id AS product_id, p.name, p.description, p.price, p.stock FROM product AS p
JOIN emp_new_order AS n
ON (p.id = n.product AND n.emp_id = $1);