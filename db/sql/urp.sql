-- DELIMITER //

CREATE OR REPLACE PROCEDURE
update_receipt_amount
(parameter_transaction_id INTEGER)
MODIFIES SQL DATA
-- BEGIN
    UPDATE receipts 
    INNER JOIN
    (
        SELECT SUM(r.line_amount) receipt_items_sum, r.transaction_id
        FROM receipt_items r
        WHERE transaction_id = parameter_transaction_id
    ) ri ON receipts.transaction_id = ri.transaction_id
    SET 
        receipts.receipt_amount = ri.receipt_items_sum,
        receipts.updated_at = CURRENT_TIMESTAMP
    WHERE 
        receipts.transaction_id = parameter_transaction_id;
-- END//

-- DELIMITER ;