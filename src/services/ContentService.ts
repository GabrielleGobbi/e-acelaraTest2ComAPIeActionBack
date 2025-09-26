import fs from 'fs';
import path from 'path';
import { DataItem } from '../types/types';

export interface ContentResponse {
  data: DataItem[];
}

export class ContentService {
  private contentPath: string;

  constructor() {
    // Caminho para a pasta de conteúdo (relativo ao diretório raiz do projeto)
    this.contentPath = path.join(process.cwd(), '..', 'content');
  }

  /**
   * Lê dados de um arquivo JSON de conteúdo
   */
  private async readContentFile(fileName: string): Promise<ContentResponse> {
    try {
      const filePath = path.join(this.contentPath, fileName);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(fileContent);
    } catch (error) {
      console.error(`Erro ao ler arquivo ${fileName}:`, error);
      return { data: [] };
    }
  }

  /**
   * Busca todos os temas
   */
  async getThemes(): Promise<ContentResponse> {
    return this.readContentFile('themes/themes.json');
  }

  /**
   * Busca um tema específico por ID
   */
  async getThemeById(id: string): Promise<DataItem | null> {
    const themes = await this.getThemes();
    return themes.data.find(theme => theme.id === id) || null;
  }

  /**
   * Busca todos os tópicos
   */
  async getTopics(): Promise<ContentResponse> {
    return this.readContentFile('topics/topics.json');
  }

  /**
   * Busca tópicos por tema
   */
  async getTopicsByTheme(themeId: string): Promise<ContentResponse> {
    const topics = await this.getTopics();
    const filteredTopics = topics.data.filter(topic => topic.themeId === themeId);
    return { data: filteredTopics };
  }

  /**
   * Busca um tópico específico por ID
   */
  async getTopicById(id: string): Promise<DataItem | null> {
    const topics = await this.getTopics();
    return topics.data.find(topic => topic.id === id) || null;
  }

  /**
   * Busca todos os exercícios
   */
  async getExercises(): Promise<ContentResponse> {
    return this.readContentFile('exercises/exercises.json');
  }

  /**
   * Busca exercícios por tópico
   */
  async getExercisesByTopic(topicId: string): Promise<ContentResponse> {
    const exercises = await this.getExercises();
    const filteredExercises = exercises.data.filter(exercise => exercise.topicId === topicId);
    return { data: filteredExercises };
  }

  /**
   * Busca um exercício específico por ID
   */
  async getExerciseById(id: string): Promise<DataItem | null> {
    const exercises = await this.getExercises();
    return exercises.data.find(exercise => exercise.id === id) || null;
  }

  /**
   * Busca exercícios por tipo (video ou exercise)
   */
  async getExercisesByType(type: 'video' | 'exercise'): Promise<ContentResponse> {
    const exercises = await this.getExercises();
    const filteredExercises = exercises.data.filter(exercise => exercise.type === type);
    return { data: filteredExercises };
  }

  /**
   * Calcula o total de itens para um tema
   */
  calculateTotalItemsForTheme(themeId: string, themes: DataItem[], topics: DataItem[]): number {
    const theme = themes.find(t => t.id === themeId);
    if (!theme) return 0;

    const themeTopics = topics.filter(topic => topic.themeId === themeId);
    return themeTopics.length;
  }

  /**
   * Calcula o total de itens para um tópico
   */
  calculateTotalItemsForTopic(topicId: string, exercises: DataItem[]): number {
    return exercises.filter(exercise => exercise.topicId === topicId).length;
  }

  /**
   * Busca conteúdo completo (tema + tópicos + exercícios)
   */
  async getFullContent(): Promise<{
    themes: DataItem[];
    topics: DataItem[];
    exercises: DataItem[];
  }> {
    const [themes, topics, exercises] = await Promise.all([
      this.getThemes(),
      this.getTopics(),
      this.getExercises()
    ]);

    return {
      themes: themes.data,
      topics: topics.data,
      exercises: exercises.data
    };
  }
}
