const { Pool } = require('pg');
// const fs = require('fs')
let parser = require('csv-parser-sync-plus-promise')

const { createViewVGear } = require("./views/v_gear.js");
const { createViewVColorOptoins } = require("./views/v_color_options.js");
const { createViewVGearOptions } = require("./views/v_gear_options.js");
const { createViewVMountType } = require("./views/v_mount_type.js");
const { createViewVOilOptions } = require("./views/v_oil_options.js");
const { createViewVOutputShaft } = require("./views/v_output_shaft.js");
const { createViewVShaftDirection } = require("./views/v_shaft_direction.js");

// const pool = new Pool({
//     user: 'postgres',
//     password: 'postgres',
//     host: 'localhost',
//     port: '5432',
//     database: 'reductors',
//   });

const pool = new Pool({
user: 'gen_user',
password: 'MEfkD2>+=pJWOp',
host: '195.133.73.129',
port: '5432',
database: 'reductors',
});

   
const files = [
              {filename: '1_s_red_gear_types.csv',     table: 's_red_gear_types',     columns: '', upload: true },
              {filename: '2_s_red_steps.csv',          table: 's_red_steps',          columns: 'id, steps, kpd',                              upload: true },
              {filename: '3_s_red_type_of_mounts.csv', table: 's_red_type_of_mounts', columns: '',                      upload: true },
              {filename: '4_s_red_type_of_items.csv', table: 's_red_type_of_items', columns: 'id, description, image', upload: true},
              {filename: '5_s_red_shaft_directions.csv', table: 's_red_shaft_directions', columns: 'id, description', upload: true},
              {filename: '6_s_red_shaft_types.csv', table: 's_red_shaft_types', columns: 'id, sign, description, image', upload: true},
              {filename: '7_s_red_code_ratio.csv', table: 's_red_ratio_code', columns: 'id, code_name, ratio', upload: true},
              {filename: '8_s_red_gear_efficiency.csv', table: 's_red_gear_efficiency', columns: 'id, gear_efficiency, description', upload: true},
              {filename: '9_s_red_mounting_position.csv', table: 's_red_mounting_position', columns: 'id, code, description, image', upload: true},
              {filename: '10_s_red_list_of_aval_mounts.csv', table: 's_red_list_of_aval_mounts', columns: 'id, mount_types, description', upload: true},
              {filename: '11 s_red_shaft_type_aval.csv', table: 's_red_shaft_type_aval', columns: 'id, shaft_output_types, description', upload: true},
              {filename: '12_s_red_shaft_aval_directions.csv', table: 's_red_shaft_aval_directions', columns: 'id, avalible_direction_shaft, description', upload: true},
              {filename: '13_s_red_gear_box_list_sizes.csv', table: 's_red_gear_box_list_size', columns: 'id, description', upload: true},
              {filename: '14 s_red_gear_sizes.csv', table: 's_red_gear_sizes', columns: 'id, code_size_manuf, gear_type_id, gear_steps_id, list_of_aval_mount_id, red_item_type_id, gear_box_list_size_id, shaft_aval_list_id, shaft_aval_direction_id', upload: true},
              {filename: '15_s_type_of_items.csv', table: 's_type_of_items', columns: 'id, name', upload: true},
              {filename: '16_s_currencies.csv', table: 's_currencies', columns: 'id, name', upload: true},
              {filename: '17_s_waiting_periods.csv', table: 's_waiting_periods', columns: 'id, name', upload: true},
              {filename: '18_d_items.csv', table: 'd_items', columns: 'id, name, quantity, type_id, waiting_period_id', upload: true},
              {filename: '19_d_red_gear.csv', table: 'd_red_gear', columns: 'id,gear_size_id,ratio_code_id,ex_ratio,t2n,p1n,gear_efficiency_id,item_name', upload: true},
              {filename: '20_s_red_oil_i.csv', table: 's_red_oil_i', columns: 'id,gear_size_id,mounting_position_id,description', upload: true},
              {filename: '21_s_flange_types.csv', table: 's_flange_type', columns: '', upload: true},
              {filename: '22_s_motor_height.csv', table: 's_motor_height', columns: 'id,height_type', upload: true},
              {filename: '23_s_adapter_type.csv', table: 's_adapter_type', columns: 'id,designation_type,flange_type_description,add_description', upload: true},
              {filename: 's_flange_dimention_image.csv', table: 's_flange_dimention_image', columns: '', upload: true},
              {filename: '26_s_output_adapter_image.csv', table: 's_output_adapter_image', columns: '', upload: true},
              {filename: '24_s_flange_dimention.csv', table: 's_flange_dimetions', columns: '', upload: true},
              {filename: '25_s_shaft_dimentions.csv', table: 's_shaft_dimentions', columns: 'id,shaft_type_id,gear_type_id,gearbox_size_id,output_shaft_size', upload: true}, 
              {filename: '28_s_shaft_dimention_data.csv', table: 's_shaft_dimention_data', columns: '', upload: true},
              {filename: '26_s_output_adapter.csv', table: 's_output_adapter', columns: '', upload: true}, 
              {filename: '27_s_red_discounts.csv', table: 's_red_discounts', columns: 'id,name,discount', upload: true},
              {filename: '30_s_color_options.csv', table: 's_color_options', columns: 'id,description,sign,add_description,name', upload: true},
              {filename: '31_s_gear_options.csv', table: 's_gear_options', columns: 'id,description,sign,add_description,name', upload: true},
              {filename: '32_s_oil_options.csv', table: 's_oil_options', columns: 'id,description,sign,add_description,name', upload: true},
              {filename: '33_s_warranty_options.csv', table: 's_warranty_options', columns: 'id,name,description,sign,add_description', upload: true},
              {filename: '34_s_item_options.csv', table: 's_item_options', columns: 'id,gear_size_list_id,gear_type_id,color_option_name,gear_option_name,item_name,oil_option_name', upload: true},
              {filename: '35_d_prices.csv', table: 'd_prices', columns: 'id,item_name,price,date,currency_id', upload: true},
]

async function loadDataFromCSV() {
    for (let file in files) {
        // парсим csv
        const data = await parser.readCsvPromise('data/' + files[file].filename)

        let inserted_rows = 0;
        // преоюразовываем JSON в массив
        for (row in data) {
            const values = JSON.stringify(Object.values(data[row])).replace("[",'').replace("]","").replaceAll("\"","'")

            let sql = '';

            if (files[file].columns) sql =`insert into ${files[file].table} (${files[file].columns}) values (${values})`;
            else sql =`insert into ${files[file].table} values (${values})`;

            try {
                const qqq = await pool.query(sql, []);
                inserted_rows++;
            }
            catch(err) {
                console.log('err', sql)
            }
        }

        console.log(files[file].table, inserted_rows, '/', data.length)
    }
}


// loadDataFromCSV()

// createViewVGear(pool);
createViewVColorOptoins(pool);
createViewVGearOptions(pool);
createViewVMountType(pool);
createViewVOilOptions(pool);
createViewVOutputShaft(pool);
createViewVShaftDirection(pool);