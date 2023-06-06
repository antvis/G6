/**
 * @fileOverview layout base class
 * @author huangtonger@aliyun.com
 */

class Base {
  execute() {
    throw new Error('please override this method');
  }
}
module.exports = Base;
