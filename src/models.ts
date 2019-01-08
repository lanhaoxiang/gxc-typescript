import {DataStream} from "../lib/datastream"

export class Step {

    user: u64;
    game: u64;

    constructor(user: u64, game: u64) {
        this.user = user;
        this.game = game;
    }

    public static fromStream(ds: DataStream): Step {
        return new Step(ds.read <u64>(), ds.read<u64>());
    }

    public toStream(): DataStream {
        let length = sizeof<u64>() + sizeof<u64>();
        let arr = new Uint8Array(length);
        let ds = new DataStream(<usize>arr.buffer, length);
        ds.write<u64>(this.user);
        ds.write<u64>(this.game);
        return ds;
    }
}

export class Book {
    title: string;

    constructor(title: string) {
        this.title = title;
    }

    public static fromStream(ds: DataStream): Book {
        return new Book(ds.readString());
    }

    public toStream():DataStream{
        let buffer = new Uint8Array();
        return new DataStream();
    }
}

export class Create {

    user: u64;
    game: u64;
    num_rows: u32;
    num_cols: u32;
    seed: u32;

    constructor(user: u64, game: u64, num_rows: u32, num_cols: u32, seed: u32) {
        this.user = user;
        this.game = game;
        this.num_rows = num_rows;
        this.num_cols = num_cols;
        this.seed = seed;
    }

    static fromStream(ds: DataStream): Create {
        return new Create(ds.read <u64>(), ds.read<u64>(), ds.read<u32>(), ds.read<u32>(), ds.read<u32>());
    }
}
