const updateReceiptProcedure = 'update_receipt_amount';

exports.up = function(knex, Promise) {
    return knex.raw(`CREATE OR REPLACE PROCEDURE
        ${updateReceiptProcedure}
        (parameter_transaction_id INTEGER)
        MODIFIES SQL DATA
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
            receipts.transaction_id = parameter_transaction_id;`);
};

exports.down = function(knex, Promise) {
    return knex.raw(`DROP PROCEDURE ${updateReceiptProcedure}`);
};
