import {N} from "./utils";
import {db_find_i64, db_get_i64, db_remove_i64, db_store_i64, db_update_i64} from "./env";
import {DataStream} from "./datastream";

export class DataTable {

    private table: u64;
    private receiver: u64;
    private code: u64;

    constructor(tableName: string, receiver: u64, code: u64) {
        this.table = N(tableName);
        this.receiver = receiver;
        this.code = code;
    }

    public get(key: u64): DataStream {
        let itr = db_find_i64(this.code, this.receiver, this.table, key);
        if (itr == -1) {
            return null;
        } else {
            let len = db_get_i64(itr, <usize>0, 0);
            let arr = new Uint8Array(len);
            db_get_i64(itr, <usize>arr.buffer, len);
            return  new DataStream(<usize>arr.buffer, len);
        }
    }

    public set(key: u64, item: DataStream): i32 {
        if (this.get(key) == null) {
            return db_store_i64(this.receiver, this.table, this.receiver, key, item.start, item.length());
        } else {
            let itr = db_find_i64(this.code, this.receiver, this.table, key);
            return db_update_i64(itr, this.receiver, item.start, item.length());
        }
    }

    public delete(key: u64):void {
        if (this.get(key) != null) {
            let itr = db_find_i64(this.code, this.receiver, this.table, key);
            db_remove_i64(itr);
        }
    }

    public remove(key: u64):void {
        this.delete(key);
    }
}
