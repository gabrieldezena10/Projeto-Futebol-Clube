import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import TeamModel from './Teams';

class MatchesModel extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: number;
}

MatchesModel.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    homeTeam: {
      allowNull: false,
      type: INTEGER,
      references: {
        model: 'teams',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    homeTeamGoals: {
      allowNull: false,
      type: INTEGER,
    },
    awayTeam: {
      allowNull: false,
      type: INTEGER,
      references: {
        model: 'teams',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    awayTeamGoals: {
      allowNull: false,
      type: INTEGER,
    },
    inProgress: {
      allowNull: false,
      type: BOOLEAN,
    },
  },
  {
    sequelize: db,
    modelName: 'matches',
    timestamps: false,
    underscored: true,
  },
);

MatchesModel.belongsTo(TeamModel, { foreignKey: 'homeTeam', as: 'teamHome' });
TeamModel.hasMany(MatchesModel, { foreignKey: 'homeTeam', as: 'homeMatches' });

MatchesModel.belongsTo(TeamModel, { foreignKey: 'awayTeam', as: 'teamAway' });
TeamModel.hasMany(MatchesModel, { foreignKey: 'awayTeam', as: 'awayMatches' });

export default MatchesModel;
