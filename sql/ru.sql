UPDATE receipts 
INNER JOIN
(
  select SUM(r.line_amount) receipt_items_sum, r.transaction_id
  from receipt_items r
  where transaction_id = 2
) ri ON receipts.transaction_id = ri.transaction_id
SET 
    receipts.receipt_amount = ri.receipt_items_sum,
    receipts.updated_at = CURRENT_TIMESTAMP
WHERE receipts.transaction_id = 2;