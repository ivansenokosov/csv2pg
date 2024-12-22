const createViewVMountType = async () => {
    const v_mount_type_view = `
    create view v_mount_type as
SELECT v_gears.id_gear,
    lam.mount_types AS r,
    tm.description,
    tm.image,
	tm.id
   FROM s_red_list_of_aval_mounts lam,
    s_red_type_of_mounts tm,
    v_gears
  WHERE lam.mount_types LIKE '%'|| tm.id || '%' AND lam.id = v_gears.list_of_aval_mount_id
    `
    const v_view = await pool.query(v_mount_type_view, []);
    console.log('v_gears: ', v_view.rowCount);
}

module.exports.createViewVMountType = createViewVMountType;