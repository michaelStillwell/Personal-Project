SELECT o.order_id, e.username
FROM emp_order AS o 
JOIN employee AS e 
ON (o.emp_id = e.username AND e.username = $1 AND o.completion = false)
GROUP BY o.order_id, e.username 
ORDER BY e.username, o.order_id;