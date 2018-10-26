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

export class Remove {

    user: u64;
    game: u64;

    constructor(user: u64, game: u64) {
        this.user = user;
        this.game = game;
    }

    static fromStream(ds: DataStream): Remove {
        return new Step(ds.read <u64>(), ds.read<u64>());
    }
}

export class RemoveAll {

    user: u64;

    constructor(user: u64) {
        this.user = user;
    }

    static fromStream(ds: DataStream): RemoveAll {
        return new RemoveAll(ds.read <u64>());
    }
}
