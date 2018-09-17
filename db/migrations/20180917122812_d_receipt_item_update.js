const triggerName = 'd_trigger_update_receipt_amount';

exports.up = function(knex, Promise) {
    return knex.raw(`CREATE OR REPLACE DEFINER=CURRENT_USER
        TRIGGER ${triggerName} AFTER DELETE
        ON receipt_items FOR EACH ROW
            CALL update_receipt_amount(OLD.transaction_id);`);
};

exports.down = function(knex, Promise) {
    return knex.raw(`DROP TRIGGER ${triggerName}`);
};
