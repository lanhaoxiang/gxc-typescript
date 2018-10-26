//WARNING: Please do not change the name of env.ts

export declare function prints(cstr: usize): void;

export declare function prints_l(cstr: usize, len: u32): void;

export declare function printi(val: i64): void;

export declare function printui(val: u64): void;

export declare function printi128(val: i32): void;

export declare function printui128(val: i32): void;

export declare function printsf(val: float): void; //TODO check type float exist in typescript

export declare function printdf(val: double): void; //TODO check type double exist in typescript

export declare function printqf(val: i32): void;

export declare function printn(val: i64): void;

export declare function printhex(data: usize, len: u32): void;

export declare function db_store_i64(scope: i64, table: i64, payer: i64, id: i64, data: usize, len: u32): i32;

export declare function db_update_i64(itr: i32, payer: i64, data: usize, len: u32): void;

export declare function db_remove_i64(itr: i32): void;

export declare function db_get_i64(itr: i32, data: usize, len: u32): i32;

export declare function db_next_i64(itr: i32, primary: i32): i32;

export declare function db_previous_i64(itr: i32, primary: i32): i32;

export declare function db_find_i64(code: i64, scope: i64, table: i64, id: i64): i32;

export declare function db_lowerbound_i64(code: i64, scope: i64, table: i64, id: i64): i32;

export declare function db_upperbound_i64(code: i64, scope: i64, table: i64, id: i64): i32;

export declare function db_end_i64(code: i64, scope: i64, table: i64): i32;

export declare function withdraw_asset(from: i64, to: i64, asset_id: i64, amount: i64): void;

export declare function get_balance(account: i64, asset_id: i64): i64;

export declare function read_action_data(data: usize, len: u32): i32;

export declare function action_data_size(): i32;

export declare function current_receiver(): u64;

export declare function get_action_asset_id(): u64;

export declare function get_action_asset_amount(): i64;

export declare function assert_sha256(data: usize, len: u32, hash_val: i32): void;

export declare function assert_sha1(data: usize, len: u32, hash_val: i32): void;

export declare function assert_sha512(data: usize, len: u32, hash_val: i32): void;

export declare function assert_ripemd160(data: usize, len: u32, hash_val: i32): void;

export declare function sha1(data: usize, len: u32, hash_val: i32): void;

export declare function sha256(data: usize, len: u32, hash_val: i32): void;

export declare function sha512(data: usize, len: u32, hash_val: i32): void;

export declare function ripemd160(data: usize, len: u32, hash_val: i32): void;

export declare function verify_signature(data: usize, len: u32, sig: i32, pubkey: i32, pubkey_len: i32): i32;

export declare function get_head_block_num(): i64;

export declare function get_head_block_id(block_id: i32): void;

export declare function get_block_id_for_num(block_id: i32, block_num: i32): void;

export declare function get_head_block_time(): i64;

export declare function get_trx_sender(): i64;

export declare function get_trx_origin(): i64;

export declare function get_account_id(data: usize, len: u32): i64;

export declare function get_asset_id(data: usize, len: u32): i64;

export declare function abort(): void;

export declare function graphene_assert(condition: i32, msg: i32): void;

export declare function graphene_assert_message(condition: i32, msg: i32, len: i32): void;

export declare function graphene_assert_code(condition: i32, error_code: i64): void;

export declare function graphene_exit(code: i32): void;

export declare function read_transaction(data: usize, len: u32): i32;

export declare function transaction_size(): i32;

export declare function expiration(): u64;

export declare function tapos_block_num(): i32;

export declare function tapos_block_prefix(): u64;

export declare function memcpy(dst: i32, src: i32, len: i32): i32;

export declare function memmove(dst: i32, src: i32, len: i32): i32;

export declare function memcmp(dst: i32, src: i32, len: i32): i32;

export declare function memset(dst: i32, value: i32, len: i32): i32;
