# GXC TYPESCRIPT Library

Current features:

- Use of apply()
- Execution of actions
- Deserialization of contract entry parameters
- Read and Inserts in tables
- Using same abi file between c ++ and TypeScript

## Getting started

``` bash
https://github.com/lanhaoxiang/gxc-typescript.git
cd gxc-typescript
npm install
```

## APIs

``` js

// debug api 控制台打印打印
export declare function print(...): void;

// table存
export declare function db_store_i64(scope: i64, table: i64, payer: i64, id: i64, data: usize, len: u32): i32;

// table更新
export declare function db_update_i64(itr: i32, payer: i64, data: usize, len: u32): void;

// table删除
export declare function db_remove_i64(itr: i32): void;

// 根据索引id读取数据
export declare function db_get_i64(itr: i32, data: usize, len: u32): i32;

// 下一条数据索引
export declare function db_next_i64(itr: i32, primary: i32): i32;

// 上一条数据索引
export declare function db_previous_i64(itr: i32, primary: i32): i32;

// 获取数据索引id
export declare function db_find_i64(code: i64, scope: i64, table: i64, id: i64): i32;

// 获取最小索引
export declare function db_lowerbound_i64(code: i64, scope: i64, table: i64, id: i64): i32;

// 获取最大索引
export declare function db_upperbound_i64(code: i64, scope: i64, table: i64, id: i64): i32;

// 获取最后一条数据
export declare function db_end_i64(code: i64, scope: i64, table: i64): i32;

// 转账到账户
export declare function withdraw_asset(from: i64, to: i64, asset_id: i64, amount: i64): void;

// 获取账户余额
export declare function get_balance(account: i64, asset_id: i64): i64;

// 读取action序列化的参数到一个存储空间中，后续进行反序列化
export declare function read_action_data(data: usize, len: u32): i32;

// 获取action大小，配合read_action_data使用
export declare function action_data_size(): i32;

// 获取当前合约的id
export declare function current_receiver(): u64;

// payable action传入的资产id
export declare function get_action_asset_id(): u64;

// payable action传入的资产数量
export declare function get_action_asset_amount(): i64;

// 验证数据的sha256值
export declare function assert_sha256(data: usize, len: u32, hash_val: i32): void;

// 验证数据的sha1值
export declare function assert_sha1(data: usize, len: u32, hash_val: i32): void;

// 验证数据的sha512值
export declare function assert_sha512(data: usize, len: u32, hash_val: i32): void;

// 验证数据的ripemd160值
export declare function assert_ripemd160(data: usize, len: u32, hash_val: i32): void;

// 计算sha1
export declare function sha1(data: usize, len: u32, hash_val: i32): void;

// 计算sha256
export declare function sha256(data: usize, len: u32, hash_val: i32): void;

// 计算sha512
export declare function sha512(data: usize, len: u32, hash_val: i32): void;

// 计算ripemd160
export declare function ripemd160(data: usize, len: u32, hash_val: i32): void;

// 验证签名
export declare function verify_signature(data: usize, len: u32, sig: i32, pubkey: i32, pubkey_len: i32): i32;

// 获取合约执行时的最新区块号
export declare function get_head_block_num(): i64;

// 获取合约执行时最新区块id
export declare function get_head_block_id(block_id: i32): void;

// 根据区块号获取区块id
export declare function get_block_id_for_num(block_id: i32, block_num: i32): void;

// 获取合约执行时的区块头时间
export declare function get_head_block_time(): i64;

// 获取合约调用者，可能是跨合约调用，则sender为上一个合约的id
export declare function get_trx_sender(): i64;

// 获取合约原始调用者
export declare function get_trx_origin(): i64;

// 推出执行
export declare function abort(): void;

// 断言操作
export declare function graphene_assert(condition: i32, msg: usize): void;

// 断言并指定失败code
export declare function graphene_assert_code(condition: i32, error_code: i64): void;

// 指定code退出
export declare function graphene_exit(code: i32): void;

// 读取当前合约调用交易到内存中
export declare function read_transaction(data: usize, len: u32): i32;

// 获取当前合约调用交易的大小
export declare function transaction_size(): i32;

// 读取交易头上的交易过期时间
export declare function expiration(): u64;

// 读取交易头上的block_num
export declare function tapos_block_num(): i32;

// 根据account_id获取account_name
export declare function get_account_name_by_id(data: usize, len: u32, account_id: i64):i64;

```
