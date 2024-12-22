async function createViewVOilOptions() {
    const sql = `
create view v_oil_options as 
 WITH option_prices AS (
     SELECT p.price,
            p.currency_id,
            p.item_name
           FROM d_prices p 
	 WHERE p.id = (( SELECT max(p2.id) AS max FROM d_prices p2 WHERE p2.item_name = p.item_name))
        )
 SELECT DISTINCT o.name,
    o.id,
    o.sign,
    o.add_description,
    o.description,
    i.id AS item_id,
    i.name AS item_name,
    d.price,
    d.currency_id
   FROM s_oil_options o,
    d_items i,
     option_prices d
  WHERE o.name = i.name
   AND i.name = d.item_name;`
    const v_view = await pool.query(sql, []);
    console.log('v_gears: ', v_view.rowCount);
}