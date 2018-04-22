# DBCenter-BE

> 技术栈 nodejs + koa2 + mysql + es6/7

> 预览地址 [http://dbcenter.top](http://dbcenter.top)

> 相关项目地址：[前端项目地址](https://github.com/wrz199306/dbcenter-fe)

## 目录
- [说明](#说明)
- [项目运行](#项目运行)
- [创建数据表](#创建数据表)
- [权限认证](#权限认证)
- [接口列表](#接口列表)


## 说明
保持原有功能不变 对代码进行优化 前端工程与后端工程分离

DBCenter是一个协助前端工程师实现数据持久化存储的后台系统

通过本系统,可以创建数据表,对该数据表进行增删改查操作

同样,开放的接口也具备增删改查的功能

从而轻易地完成简单的数据库操作

如果对此项目感兴趣,请点击star支持一下 ^_^


## 项目运行

运行前请先安装`nodejs`和`mysql`

`clone`项目到本地

```
git clone https://github.com/wrz199306/DECenter-BE
```

安装依赖
```
npm install
```

配置

```
进入config.json
完善mysql配置,无需配置msgApi
系统登陆手机验证码验证代码已被注释, 可输入任意验证码登陆系统
```

项目运行

```
npm run start
```

## 创建数据表

- 登录[DBCenter](http://dbcenter.top)后，可创建数据表
- 默认生成ID字段
- 数据表字段类型分为3种
    1. 字符串: VARCHAR(255)
    2. 数值: FLOAT(32, 5)
- 数据表字段可定义默认值
- 数据表字段可定义必填与唯一,请珍重。

## 权限认证
接口调用, 权限认证, 采用请求头传参实现。

| 名称 | 类型 | 是否必须 | 说明 |
|:------:|:-------:|:-------------:|:-------------:|
| phone | String | 是 | [DBCenter](http://dbcenter.top)登录所用到的手机号 |
| secret | String | 是 | [DBCenter](http://dbcenter.top)登录之后右上角获取 |


## 接口列表

### 数据插入接口

#### 调用地址：http://dbcenter.top:8888/data/:tableName

#### 请求方式：POST

#### 返回类型：JSON

#### 请求参数(params)：
| 名称 | 类型 | 是否必须 | 说明 |
|:------:|:-------:|:-------------:|:-------------:|
| tableName | String | 是 | 将要操作的数据表名,通过[DBCenter](http://dbcenter.top)可添加数据表 |

#### 请求参数(body)：
| 名称 | 类型 | 是否必须 | 说明 |
|:------:|:-------:|:-------------:|:-------------:|
| attrData | Object | 是 | 将要插入的数据，请严格遵守[DBCenter](http://dbcenter.top)中所定义的数据规则 |

#### 请求示例：
```
var xhr = new XMLHttpRequest();

// 数据表person
xhr.open('post',`http://dbcenter.top:8888/data/person`);

xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

// 头域中设置手机号和密码
xhr.setRequestHeader("phone", "185****7810");
xhr.setRequestHeader("secret", "******");

// 将要插入数据表中的数据
var attrData = {
    name: 'Scrat',
    age: 25,
    base: '北京'
}

xhr.send(`attrData=${JSON.stringify(attrData)}`);

xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText);
    }
}
```

#### 正常返回示例：
| 字段 | 类型 | 描述 |
|:------:|:-------:|:-------------:|
| code | Number | 0为正确, >0错误 |
| data | Number | 插入的数据ID |

---
### 数据删除接口

#### 调用地址：http://dbcenter.top:8888/data/:tableName

#### 请求方式：DELETE

#### 返回类型：JSON

#### 请求参数(params)：
| 名称 | 类型 | 是否必须 | 说明 |
|:------:|:-------:|:-------------:|:-------------:|
| tableName | String | 是 | 将要操作的数据表名,通过[DBCenter](http://dbcenter.top)可添加数据表 |

#### 请求参数(body)：
| 名称 | 类型 | 是否必须 | 说明 |
|:------:|:-------:|:-------------:|:-------------:|
| id | Number | 是 | 将要删除的数据ID |

#### 请求示例：
```
var xhr = new XMLHttpRequest();

// 数据表person
xhr.open('delete', `http://dbcenter.top:8888/data/person`);

xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

// 头域中设置手机号和密码
xhr.setRequestHeader("phone", "185****7810");
xhr.setRequestHeader("secret", "******");

// 将要删除的数据的ID
xhr.send(`id=7`);

xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText);
    }
}

```

#### 正常返回示例：
| 字段 | 类型 | 描述 |
|:------:|:-------:|:-------------:|
| code | Number | 0为正确, >0错误 |
| data | Number | success |

---
### 数据更新接口

#### 调用地址：http://dbcenter.top:8888/data/:tableName

#### 请求方式：PUT

#### 返回类型：JSON

#### 请求参数(params)：
| 名称 | 类型 | 是否必须 | 说明 |
|:------:|:-------:|:-------------:|:-------------:|
| tableName | String | 是 | 将要操作的数据表名,通过[DBCenter](http://dbcenter.top)可添加数据表 |

#### 请求参数(body)：
| 名称 | 类型 | 是否必须 | 说明 |
|:------:|:-------:|:-------------:|:-------------:|
| id | Number | 是 | 将要更新的数据ID |
| newAttrData | Object | 是 | 将要更新的数据，请严格遵守[DBCenter](#)中所定义的数据规则 |


#### 请求示例：
```
var xhr = new XMLHttpRequest();
    
var attrData = {
    name: '大帅哥'
}

// 数据表Person
xhr.open('put', `http://dbcenter.top:8888/data/person`);

xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

// 头域中设置手机号和密码
xhr.setRequestHeader("phone", "185****7810");
xhr.setRequestHeader("secret", "******");

// id: 修改的数据id
// newAttrData: 新数据的值
xhr.send(`id=3&newAttrData=${JSON.stringify(attrData)}`);

xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText);
    }
}
```

#### 正常返回示例：
| 字段 | 类型 | 描述 |
|:------:|:-------:|:-------------:|
| code | Number | 0为正确, >0错误 |
| data | Number | success |
---
### 数据查询接口

#### 调用地址：http://dbcenter.top:8888/data/:tableName

#### 请求方式：GET

#### 返回类型：JSON

#### 请求参数(params)：
| 名称 | 类型 | 是否必须 | 说明 |
|:------:|:-------:|:-------------:|:-------------:|
| tableName | String | 是 | 将要操作的数据表名,通过[DBCenter](http://39.107.239.177)可添加数据表 |

#### 请求参数(query)：
| 名称 | 类型 | 是否必须 | 说明 |
|:------:|:-------:|:-------------:|:-------------:|
| condition | String | 否 | 查询条件，JSON字符串 |


#### 请求示例：
```
var xhr = new XMLHttpRequest();
    
var condition = {
    name: 'Scrat'
}

// 数据表Person
xhr.open('get',`http://dbcenter.top:8888/data/person?condition=${JSON.stringify(condition)}`);

// 头域中设置手机号和密码
xhr.setRequestHeader("phone", "185****7810");
xhr.setRequestHeader("secret", "****");

xhr.send();

xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText);
    }
}
```

#### 正常返回示例：
| 字段 | 类型 | 描述 |
|:------:|:-------:|:-------------:|
| code | Number | 0为正确, >0错误 |
| data | Number | 数据列表 |
