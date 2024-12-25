async function createViewVShaftDirection(pool) {
    const sql = `
    create view v_shaft_direction as
 
 SELECT v1.id_gear,
    list.avalible_direction_shaft AS r,
    dir.description AS d,
    dir.id,
    list.id AS shaft_direction_id,
	gt.shaft_direction_image
   FROM s_red_shaft_aval_directions list,
    s_red_shaft_directions dir,
	v_gears v1,
	s_red_gear_types gt
  WHERE list.avalible_direction_shaft ~~ (('%'::text || dir.id) || '%'::text) AND list.id = v1.shaft_aval_direction_id
  and gt.id = v1.gear_type_id
    `
    const v_view = await pool.query(sql, []);
    console.log('v_gears: ', v_view.rowCount);
}

module.exports.createViewVShaftDirection = createViewVShaftDirection;