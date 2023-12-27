module.exports = (sequelize, DataTypes) => {
  const courses = sequelize.define(
    'courses',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      price: {
        type: DataTypes.STRING,
        defaultValue: 'free',
      },
      estimatedPrice: {
        type: DataTypes.INTEGER,
      },
      tags: {
        type: DataTypes.TEXT,
      },
      demoVideoUrl: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      ratings: {
        type: DataTypes.INTEGER,
        defaultValue: 5,
      },
      purchased: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      schedule: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      durationMonth: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      feeInterval: {
        type: DataTypes.STRING,
        allowNull: false,
        // values: ['monthly', 'full'],
        defaultValue: 'monthly',
      },
      instructor: {
        type: DataTypes.TEXT,
        defaultValue: '{}',
      },
      classInfo: {
        type: DataTypes.TEXT,
        defaultValue: '{}',
      },
    },
    { timestamps: true }
  );

  courses.associate = (models) => {
    courses.hasMany(models.reviews, {
      foriegnKey: 'courseId',
      onDelete: 'CASCADE',
    });
    courses.hasMany(models.resources, {
      foriegnKey: 'courseId',
      onDelete: 'CASCADE',
    });
    courses.hasMany(models.recordedclasses, {
      foriegnKey: 'courseId',
      onDelete: 'CASCADE',
    });
    courses.hasMany(models.discussions, {
      foriegnKey: 'courseId',
      onDelete: 'CASCADE',
    });
  };
  return courses;
};
