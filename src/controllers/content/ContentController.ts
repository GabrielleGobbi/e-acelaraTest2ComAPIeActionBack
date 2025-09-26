import { NextFunction, Request, Response } from "express";
import { ContentService } from "../../services/ContentService";
import { STATUS_CODE } from "../../utils/constants";

export class ContentController {
  private contentService: ContentService;

  constructor() {
    this.contentService = new ContentService();
  }

  /**
   * Busca todos os temas
   */
  async getThemes(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.contentService.getThemes();
      return res.status(STATUS_CODE.OK).json(data);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Busca um tema específico por ID
   */
  async getThemeById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const theme = await this.contentService.getThemeById(id);
      
      if (!theme) {
        return res.status(STATUS_CODE.NOT_FOUND).json({
          message: 'Tema não encontrado'
        });
      }

      return res.status(STATUS_CODE.OK).json({ data: theme });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Busca todos os tópicos
   */
  async getTopics(req: Request, res: Response, next: NextFunction) {
    try {
      const { themeId } = req.query;
      
      let data;
      if (themeId) {
        data = await this.contentService.getTopicsByTheme(themeId as string);
      } else {
        data = await this.contentService.getTopics();
      }

      return res.status(STATUS_CODE.OK).json(data);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Busca um tópico específico por ID
   */
  async getTopicById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const topic = await this.contentService.getTopicById(id);
      
      if (!topic) {
        return res.status(STATUS_CODE.NOT_FOUND).json({
          message: 'Tópico não encontrado'
        });
      }

      return res.status(STATUS_CODE.OK).json({ data: topic });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Busca todos os exercícios
   */
  async getExercises(req: Request, res: Response, next: NextFunction) {
    try {
      const { topicId, type } = req.query;
      
      let data;
      if (topicId) {
        data = await this.contentService.getExercisesByTopic(topicId as string);
      } else if (type) {
        data = await this.contentService.getExercisesByType(type as 'video' | 'exercise');
      } else {
        data = await this.contentService.getExercises();
      }

      return res.status(STATUS_CODE.OK).json(data);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Busca um exercício específico por ID
   */
  async getExerciseById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const exercise = await this.contentService.getExerciseById(id);
      
      if (!exercise) {
        return res.status(STATUS_CODE.NOT_FOUND).json({
          message: 'Exercício não encontrado'
        });
      }

      return res.status(STATUS_CODE.OK).json({ data: exercise });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Busca conteúdo completo (para estatísticas)
   */
  async getFullContent(req: Request, res: Response, next: NextFunction) {
    try {
      const content = await this.contentService.getFullContent();
      return res.status(STATUS_CODE.OK).json(content);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Calcula estatísticas de progresso
   */
  async getProgressStats(req: Request, res: Response, next: NextFunction) {
    try {
      const { themeId, topicId } = req.query;
      const content = await this.contentService.getFullContent();

      let stats;
      if (themeId) {
        const totalTopics = content.topics.filter(t => t.themeId === themeId).length;
        const totalExercises = content.exercises.filter(e => 
          content.topics.find(t => t.id === e.topicId && t.themeId === themeId)
        ).length;
        
        stats = {
          themeId,
          totalTopics,
          totalExercises,
          totalItems: totalTopics + totalExercises
        };
      } else if (topicId) {
        const totalExercises = content.exercises.filter(e => e.topicId === topicId).length;
        
        stats = {
          topicId,
          totalExercises,
          totalItems: totalExercises
        };
      } else {
        stats = {
          totalThemes: content.themes.length,
          totalTopics: content.topics.length,
          totalExercises: content.exercises.length,
          totalItems: content.themes.length + content.topics.length + content.exercises.length
        };
      }

      return res.status(STATUS_CODE.OK).json({ data: stats });
    } catch (error) {
      next(error);
    }
  }
}
