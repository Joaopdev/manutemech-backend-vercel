import * as Yup from 'yup';

export const maintenanceSchema = Yup.object().shape({
  entry_date: Yup.date().required(),
  exits_date: Yup.date().required(),
  km_vehicle: Yup.number().required().positive().integer(),
  responsible_mechanic: Yup.string().required(),
  maintenance_price: Yup.number().required().positive(),
  remarks: Yup.string(),
  vehicleId: Yup.number().required().positive().integer(),
  parts: Yup.array().of(
    Yup.object().shape({
      partId: Yup.number().required().positive().integer(),
      price: Yup.number().required().positive(),
      supplierId: Yup.number().required().positive().integer(),
    })
  ),
  services: Yup.array().of(Yup.number().required().positive().integer()),
  workshopId: Yup.number().required().positive().integer(),
});
