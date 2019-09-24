const Sequelize = require('sequelize');
const conn = new Sequelize (process.env.DATABASE_URL || 'postgres://localhost/page_db');
const {UUID, UUIDV4, STRING, TEXT, INTEGER} = Sequelize

const Page = conn.define('page', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },
  title: {
    type: STRING,
    allowNull: false,
    unique: true
  }
})

const Content = conn.define('content', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },
  title: {
    type: STRING,
    allowNull: false,
    unique: true
  },
  body: {
    type: TEXT,
    unique: true
  },
  priority: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 5
  }
})

Page.belongsTo(Content, {as: 'parent'});
Content.hasMany(Page, {foreignKey: 'parentId'})

const syncAndSeed = async () => {
  await conn.sync({force: true});
}

syncAndSeed();

module.exports={
  syncAndSeed,
  module:{
    Content,
    Page
  }
}
