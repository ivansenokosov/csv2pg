const createViewVOutputShaft = async () => {
    const sql = `
    create view v_output_shaft as

SELECT v1.id_gear,
    outshaft.id AS r,
    (outshaft.sign || ' '::text) || outshaft.description AS d,
	outshaft.id,
	v1.shaft_aval_list_id list_shaft_id
   FROM s_red_shaft_type_aval listshaft,
    s_red_shaft_types outshaft,
    v_gears v1
  WHERE listshaft.shaft_output_types ~~ (('%'::text || outshaft.id) || '%'::text) AND listshaft.id = v1.shaft_aval_list_id
 `
    const v_view = await pool.query(sql, []);
    console.log('v_gears: ', v_view.rowCount);
}

module.exports.createViewVOutputShaft = createViewVOutputShaft;