/**
 * 自动生成 sitemap.xml 文件
 * 扫描 /docs 文件夹下的所有文件
 * 根据文件路径生成 URL
 * 英文文档添加 /en 路径
 * 将驼峰命名转换为短横线格式
 */
import fs from 'fs';
import moment from 'moment';
import path from 'path';
import xmlbuilder from 'xmlbuilder';

// 配置项
const config = {
  docsDir: path.resolve(__dirname, '../docs'),
  outputDir: path.resolve(__dirname, '../dist'),
  baseUrl: 'http://g6.antv.antgroup.com',
  xmlFileName: 'sitemap.xml',
};

// 生成日期时间
const currentDateTime = moment().format('YYYY-MM-DDTHH:mm:ss+00:00');

// 将驼峰命名转换为短横线格式
function camelToKebab(str: string) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

// 从文件路径构建URL
function buildUrlFromFilePath(filePath: string) {
  // 相对于 docs 目录的路径
  const relativePath = path.relative(config.docsDir, filePath);

  // 将文件路径按目录分割
  const pathParts = relativePath.split(path.sep);

  // 处理文件名，去除扩展名
  let fileName = pathParts[pathParts.length - 1];
  const isEnglish = fileName.endsWith('.en.md');

  // 去除扩展名
  fileName = fileName.replace(/\.en\.md$/, '').replace(/\.zh\.md$/, '');

  // 转换为短横线格式
  fileName = camelToKebab(fileName);

  // 替换文件名
  pathParts[pathParts.length - 1] = fileName;

  // 构建 URL 路径
  const urlPath = pathParts.join('/');

  // 构建完整 URL
  let url = config.baseUrl;
  if (isEnglish) {
    url += '/en';
  }

  // 添加路径
  url += '/' + urlPath;

  return url;
}

// 扫描目录下的所有 .md 文件
function scanDirectory(dir: string, fileList: string[] = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // 递归扫描子目录
      scanDirectory(filePath, fileList);
    } else if (file.endsWith('.md')) {
      // 只处理 markdown 文件
      fileList.push(filePath);
    }
  });

  return fileList;
}

// 生成 sitemap.xml 文件
function generateSitemap() {
  // 创建 XML 根元素
  const root = xmlbuilder
    .create('urlset', {
      version: '1.0',
      encoding: 'utf-8',
    })
    .att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')
    .att('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance')
    .att(
      'xsi:schemaLocation',
      'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd',
    );

  // 添加注释
  root.comment(` Created By G6 Sitemap Generator,  Generated at: ${currentDateTime} `);

  // 添加首页
  root.ele('url').ele('loc', config.baseUrl).up().ele('lastmod', currentDateTime).up().ele('priority', '1.00');

  // 扫描所有文档文件
  const mdFiles = scanDirectory(config.docsDir);

  // 按照 URL 排序以确保一致性
  mdFiles.sort();

  // 记录已处理的 URL，避免重复
  const processedUrls = new Set([config.baseUrl]);

  // 为每个文档文件创建 URL 条目
  mdFiles.forEach((filePath, index) => {
    const url = buildUrlFromFilePath(filePath);

    // 避免重复的 URL
    if (processedUrls.has(url)) {
      return;
    }
    processedUrls.add(url);

    // 计算优先级，首页为 1.00，其余根据深度逐渐降低
    const depth = url.split('/').length - 3; // 扣除 http:// 和域名部分
    const priority = Math.max(0.5, 1 - depth * 0.1).toFixed(2);

    // 添加 URL 条目
    root.ele('url').ele('loc', url).up().ele('lastmod', currentDateTime).up().ele('priority', priority);
  });

  // 生成 XML 字符串
  const xmlString = root.end({ pretty: true });

  // 确保输出目录存在
  if (!fs.existsSync(config.outputDir)) {
    fs.mkdirSync(config.outputDir, { recursive: true });
  }

  // 写入文件
  const outputPath = path.join(config.outputDir, config.xmlFileName);
  fs.writeFileSync(outputPath, xmlString);

  console.log(`已生成 sitemap.xml，包含 ${processedUrls.size} 个 URL，文件保存在：${outputPath}`);
}

// 执行
generateSitemap();
