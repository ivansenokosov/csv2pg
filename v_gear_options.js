async function createViewVShaftDirection() {
    const sql = `
    create view v_gear_options as

 WITH option_prices AS (
         SELECT p.price,
            p.currency_id,
            p.item_name
           FROM s_item_options io_1,
            d_prices p
          WHERE p.item_name = io_1.item_name AND p.id = (( SELECT max(p2.id) AS max
                   FROM d_prices p2
                  WHERE p2.item_name = p.item_name))
        )
 SELECT DISTINCT o.name,
    o.sign,
    o.add_description,
    o.id,
    o.description,
    i.id AS item_id,
    i.name AS item_name,
    d.price,
    d.currency_id,
    io.gear_size_list_id
   FROM s_gear_options o,
    s_item_options io,
    d_items i,
    option_prices d
  WHERE io.gear_option_name = o.name AND i.name = io.item_name AND io.item_name = d.item_name;
`
    const v_view = await pool.query(sql, []);
    console.log('v_gears: ', v_view.rowCount);
}