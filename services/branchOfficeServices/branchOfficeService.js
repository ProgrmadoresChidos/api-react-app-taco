const boRepository = require('../../repository/branchOfficeRepository/branchOfficeRepository');
const BOError = require('../../errors/branchOfficeErrors/branchOfficeError');
const { handleError } = require('../../utils');

module.exports = {
  // Create branch office
  createBO: async (bo) => {
    try {
      const newBo = await boRepository.createBO(bo);
      return {
        status: 200,
        ...newBo,
      }
    } catch (err) {
      return new BOError(handleError(err), 400);
    }
  },
  // Get all branch offices
  getBOs: async (from, limit, fields, sortBy, filters) => {
    try {
      const resp = await boRepository.getBOs(from, limit, fields, sortBy, filters);
      return {
        status: 200,
        branchOffices: resp,
      }
    } catch (err) {
      return new BOError(handleError(err), 400);
    }
  },
  getBO: async (id, fields) => {
    try {
      const bo = await boRepository.getBO(id, fields);
      if (bo) {
        return {
          status: 200,
          ...bo,
        }
      } else {
        throw {
          errors: {
            id: {
              message: 'Invalid Branch Office ID'
            },
          }
        };
      }
    } catch (err) {
      // TODO : Validar error cuando el id no cumple con el tamaño,
      // considerar agregar otra clase para los errores desconocidos
      // console.log(err.name);
      // console.log(err.message);
      return new BOError(handleError(err), 400);
    }
  },
  updateBO: async (id, fields) => {
    try {
      const updatedBo = await boRepository.updateBO(id, fields);
      if (updatedBo) {
        return {
          status: 200,
          ...updatedBo,
        }
      } else {
        throw {
          errors: {
            id: {
              message: 'Invalid Branch Office ID'
            },
          }
        }
      }
    } catch (err) {
      return new BOError(handleError(err), 400);
    }
  },
  deleteBO: async id => {
    try {
      const deletedBo = await boRepository.deleteBO(id);
      if (deletedBo) {
        return {
          status: 200,
          ...deletedBo,
        }
      } else {
        throw {
          errors: {
            id: {
              message: 'Invalid Branch Office ID'
            }
          }
        };
      }
    } catch (err) {
      return new BOError(handleError(err), 400);
    }
  },
};