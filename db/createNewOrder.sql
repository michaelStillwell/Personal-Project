INSERT INTO emp_order (order_id, product, emp_id, completion)
VALUES (
    $1,
    $2,
    $3,
    false
);

DELETE FROM emp_new_order WHERE emp_id = $3;