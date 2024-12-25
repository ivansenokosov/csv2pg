const createViewVColorOptoins = async (pool) => {
    const sql = `
    create view v_color_options as

with option_prices as (
SELECT p.price,
            p.currency_id,
            p.item_name
           FROM d_prices p 
	 WHERE p.id = (( SELECT max(p2.id) AS max FROM d_prices p2 WHERE p2.item_name = p.item_name))
)

select distinct o.name, o.id, o.sign, o.add_description, o.description, i.id item_id, i.name item_name, io.gear_size_list_id
, d.price, d.currency_id
         from s_color_options o
		      , s_item_options io
              , d_items i
			  , option_prices d
        where io.color_option_name = o.name
 		  and i.name = io.item_name
		  and io.item_name = d.item_name
and o.sign <> '0'
`
    const v_view = await pool.query(sql, []);
    console.log('v_gears: ', v_view.rowCount);
}

module.exports.createViewVColorOptoins = createViewVColorOptoins;