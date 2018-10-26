import {get_action_asset_amount, get_action_asset_id, get_trx_sender, printi, withdraw_asset} from "../lib/env";
import {Contract} from "../lib/contract";
import {assert, N, string2cstr} from "../lib/utils";
import {Book, Create} from "./models";

class HelloWorld extends Contract {
    create(args: Create): void {
        //test receiver
        printi(this.receiver);

        //test parameters
        printi(args.num_rows);
        printi(args.num_cols);
        printi(args.seed);

        //test api
        printi(get_action_asset_id());
        printi(get_action_asset_amount());
        printi(get_trx_sender());

        //test deposit/withdraw
        withdraw_asset(this.receiver, get_trx_sender(), get_action_asset_id(), get_action_asset_amount() / 2);//返还1半给送钱的

        //test storage create/delete/query/modify
        //db_store_i64(scope : u64, table : u64, payer: u64, id : u64,  data : u32, len : u32) : i32;
        // let buffer_address = string2cstr("my first book");
        let dt = this.getTable('book');
        let book = new Book("my first book");
        dt.set("mybook", book.toStream());
        // let book_idx_1 = db_store_i64(this.receiver, N("book"), 0, this.receiver, buffer_address, 13);//TODO FIXME get_table_objects failed
    }

    apply(action: u64): void {
        if (action == N("create")) {
            this.create(Create.fromStream(this.getActionStream()));
        } else {
            assert(false, "unknown action");
        }
    }
}

/**
 * entry point of the contract
 * @param {u64} receiver - The contract caller
 * @param {u64} code - The id of this contract
 * @param {u64} action - The method that called
 */
export function apply(receiver: u64, code: u64, action: u64): void {
    var gol: HelloWorld = new HelloWorld(receiver, code);
    gol.apply(action);
}


