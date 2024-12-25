const createViewVGear = async (pool) =>{
    const v_gears_view = `
create view v_gears as 
 WITH prices AS (
         SELECT COALESCE(p_1.price, 0::numeric) AS price,
            c.name AS currency,
            i.quantity,
            COALESCE(c.id, 0) AS currency_id,
            w.name AS waiting_period_str,
            i.name AS item_name
           FROM d_items i
             LEFT JOIN d_prices p_1 ON p_1.item_name = i.name AND p_1.id = (( SELECT max(d_prices.id) AS max
                   FROM d_prices
                  WHERE d_prices.item_name = p_1.item_name))
             LEFT JOIN d_red_gear inv_1 ON i.name = inv_1.item_name
             LEFT JOIN s_currencies c ON p_1.currency_id = c.id
             LEFT JOIN s_waiting_periods w ON i.waiting_period_id = w.id
        )
 SELECT tbl1.id AS id_size_gear,
    tbl1.code_size_manuf AS code_manuf,
    (('PW '::text || tbl1.code_size_manuf) || '-'::text) || codratio.code_name AS code_aspect,
    round(data_gear.t2n * 1450::numeric / (9550::numeric * data_gear.ex_ratio * 1::numeric), 2) AS p1n_1450,
    tbl1.gear_type_id,
    step_g.steps AS steps_quantity,
    eff.gear_efficiency AS kpd,
    tbl1.gear_steps_id,
    tbl1.list_of_aval_mount_id,
    tbl1.red_item_type_id,
    tbl1.gear_box_list_size_id,
    tbl1.shaft_aval_list_id,
    tbl1.shaft_aval_direction_id,
    data_gear.id AS id_gear,
    data_gear.ratio_code_id,
    data_gear.t2n,
    data_gear.ex_ratio,
    data_gear.p1n,
    p.price,
    p.currency_id,
    p.item_name
   FROM s_red_gear_sizes tbl1,
    s_red_steps step_g,
    d_red_gear data_gear,
    s_red_ratio_code codratio,
    s_red_gear_efficiency eff,
    prices p
  WHERE step_g.id = tbl1.gear_steps_id AND data_gear.gear_size_id = tbl1.id AND codratio.id = data_gear.ratio_code_id AND eff.id = data_gear.gear_efficiency_id AND data_gear.ex_ratio > 0::numeric AND data_gear.item_name = p.item_name
`
    const v_gears = await pool.query(v_gears_view, []);
    console.log('v_gears: ', v_gears.rowCount);
}


module.exports.createViewVGear = createViewVGear;