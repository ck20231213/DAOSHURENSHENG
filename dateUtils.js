/**
 * 日期工具函数集合
 * @module utils/dateUtils
 */

/**
 * 计算两个日期之间的天数差
 * @param {string|Date} startDate 开始日期，可以是日期字符串或Date对象
 * @param {string|Date} [endDate=new Date()] 结束日期，默认为当前日期
 * @returns {number} 天数差（整数）
 * @example
 * // 计算从2000-01-01到现在的天数
 * const days = getDaysBetween('2000-01-01');
 * 
 * // 计算从2000-01-01到2020-01-01的天数
 * const days = getDaysBetween('2000-01-01', '2020-01-01');
 */
export function getDaysBetween(startDate, endDate = new Date()) {
  // 确保日期格式
  const start = startDate instanceof Date ? startDate : new Date(startDate);
  const end = endDate instanceof Date ? endDate : new Date(endDate);
  
  // 去除时分秒毫秒的影响，只保留日期部分
  const startUtc = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
  const endUtc = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
  
  // 计算天数差并取整
  return Math.floor((endUtc - startUtc) / (24 * 60 * 60 * 1000));
}

/**
 * 格式化日期为 YYYY-MM-DD 格式
 * @param {Date} date 日期对象
 * @returns {string} 格式化后的日期字符串，形如 "2023-04-30"
 * @example
 * const formattedDate = formatDate(new Date());
 */
export function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
} 