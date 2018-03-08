SELECT * FROM product AS p
JOIN emp_order AS o 
ON (p.id = o.product 
AND o.emp_id = $1 
AND o.order_id = $2
AND o.completion = false);