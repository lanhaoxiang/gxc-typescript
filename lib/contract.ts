import {DataStream} from "./datastream";
import {action_data_size, read_action_data} from "./env";
import {DataTable} from "./datatable";

export class Contract {

    receiver: u64;
    code: u64;

    constructor(receiver: u64, code: u64) {
        this.receiver = receiver;
        this.code = code;
    }

    getActionStream(): DataStream {
        let len = action_data_size();
        let arr = new Uint8Array(len);
        read_action_data(<usize>arr.buffer, len);
        let ds = new DataStream(<usize>arr.buffer, len);
        return ds;
    }

    getTable(tableName: string) {
        return new DataTable(tableName, this.receiver, this.code);
    }

}
