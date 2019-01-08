const fs = require('fs');

let modelFile = fs.readFileSync('../src/models/Step.tst', 'utf8');

let className = modelFile.match(/(interface|class) .* {/)[0].replace(/(interface|class)|{/g, "").trim();

let fields = modelFile.match(/\{(.|\s)*\}/g)[0].replace(/\{|\}/g, '')
    .trim()
    .split(';')
    .filter(line => !!line)
    .map(line => {
        let pair = line.trim().split(':').map(s => s.trim());
        return {
            name: pair[0],
            type: pair[1]
        };
    });

let output = [`class ${className} {`];

const util = {
    isArray(type) {
        return !!type.match(/Array<\w+>/);
    },
    isUserDefined(type) {
        return ["bool", "u8", "i8","u16","i16", "u32", "i32", "u64", "i64", "string"].indexOf(type) > -1;
    }
};

// fileds
const filedsGenertator = (fields) => {
    return fields.map(f => {
        return `  ${f.name}:${f.type};`;
    });
};

// constructor
const constructorGenerator = (fields) => {
    let params = fields.map(f => `${f.name}:${f.type}`).join(',');
    let statements = fields.map(f => `    this.${f.name}=${f.name};`);
    return `  constructor(${params}){\n${statements.join('\n')}\n  }`;
};

// fromStream
const fromStreamGenerator = (fields, className) => {
    let statements = fields.map(f => {
        return `    let ${f.name} = ds.read<${f.type}>();`;
    });
    statements.push(`    return new ${className}(${fields.map(f => f.name).join(',')})\n`);
    return `  public static fromStream(ds:DataStream):${className}{\n${statements.join('\n')}  }`;
};

// toStream
const toStreamGenerator = (fields, className) => {
    let statements = [
        `    let len = ${className}.size();`,
        `    let arr = new Uint8Array(len);`,
        `    let ds = new DataStream(<usize>arr.buffer, len)`
    ];
    fields.forEach(f => {
        statements.push(`    ds.write<${f.type}>(this.${f.name});`);
    });
    statements.push(`    return ds;\n`);
    return `  public toStream():DataStream{\n${statements.join('\n')}  }`;
};

const sizeGenerator = (fields) => {
    let statements = [
        `    let size=0;`
    ];
    fields.forEach(f => {
        statements.push(`    size+=sizeof<${f.type}>();`);
    });
    statements.push(`    return size;\n`);
    return [`  public static size():u32{\n${statements.join('\n')}  }`,`  public size():u32{\n${statements.join('\n')}  }`].join('\n');
};

console.log(output.concat(filedsGenertator(fields))
    .concat(constructorGenerator(fields))
    .concat(fromStreamGenerator(fields, className))
    .concat(toStreamGenerator(fields, className))
    .concat(sizeGenerator(fields))
    .concat('}')
    .join('\n'));

