// Configuración Enterprise para servicios de validación avanzada

export interface EnterpriseValidationConfig {
  // Configuración de servicios externos
  enableExternalValidation: boolean;
  azureContentModerator?: {
    endpoint: string;
    key: string;
  };
  
  // Configuración de logging
  enableLogging: boolean;
  logLevel: 'info' | 'warn' | 'error';
  
  // Configuración de límites
  maxInputLength: number;
  maxValidationTime: number; // ms
  
  // Configuración de dominios corporativos
  allowedEmailDomains: string[];
  
  // Configuración de actualización
  enableAutoUpdate: boolean;
  updateInterval: number; // días
}

// Configuración por defecto
export const defaultEnterpriseConfig: EnterpriseValidationConfig = {
  enableExternalValidation: false,
  enableLogging: true,
  logLevel: 'warn',
  maxInputLength: 1000,
  maxValidationTime: 5000,
  allowedEmailDomains: ['empresa.com', 'sucursal.net'],
  enableAutoUpdate: false,
  updateInterval: 30
};

// Logger para monitoreo de intentos de bypass
export class ValidationLogger {
  private static instance: ValidationLogger;
  private logs: Array<{
    timestamp: Date;
    level: string;
    message: string;
    input?: string;
    detectedThreats?: string[];
  }> = [];

  static getInstance(): ValidationLogger {
    if (!ValidationLogger.instance) {
      ValidationLogger.instance = new ValidationLogger();
    }
    return ValidationLogger.instance;
  }

  log(level: string, message: string, input?: string, detectedThreats?: string[]) {
    const logEntry = {
      timestamp: new Date(),
      level,
      message,
      input: input?.substring(0, 100), // Limitar longitud para privacidad
      detectedThreats
    };

    this.logs.push(logEntry);

    // En producción, enviar a servicio de logging
    if (process.env.NODE_ENV === 'production') {
      console.log(`[${level.toUpperCase()}] ${message}`, {
        input: logEntry.input,
        threats: detectedThreats
      });
    }
  }

  getLogs() {
    return this.logs;
  }

  clearLogs() {
    this.logs = [];
  }
}

// Servicio de validación enterprise (ejemplo con Azure Content Moderator)
export class EnterpriseValidationService {
  private config: EnterpriseValidationConfig;
  private logger: ValidationLogger;

  constructor(config: EnterpriseValidationConfig = defaultEnterpriseConfig) {
    this.config = config;
    this.logger = ValidationLogger.getInstance();
  }

  async validateWithExternalService(text: string): Promise<{
    isSafe: boolean;
    threatLevel: number;
    detectedThreats: string[];
  }> {
    if (!this.config.enableExternalValidation) {
      return {
        isSafe: true,
        threatLevel: 0,
        detectedThreats: []
      };
    }

    try {
      // Simulación de llamada a servicio externo
      // En producción, usar Azure Content Moderator o similar
      const threatLevel = await this.simulateExternalValidation(text);
      
      const result = {
        isSafe: threatLevel < 3,
        threatLevel,
        detectedThreats: threatLevel > 0 ? ['contenido_sospechoso'] : []
      };

      this.logger.log('info', 'Validación externa completada', text, result.detectedThreats);
      
      return result;
    } catch (error) {
      this.logger.log('error', 'Error en validación externa', text);
      return {
        isSafe: true, // Fallback seguro
        threatLevel: 0,
        detectedThreats: []
      };
    }
  }

  private async simulateExternalValidation(text: string): Promise<number> {
    // Simulación de análisis de contenido
    const suspiciousPatterns = [
      /\b(hack|crack|exploit|vulnerability)\b/i,
      /\b(password|admin|root)\b/i,
      /<script|javascript:|on\w+=/i
    ];

    const threatScore = suspiciousPatterns.reduce((score, pattern) => {
      return score + (pattern.test(text) ? 1 : 0);
    }, 0);

    return Math.min(threatScore, 5); // Escala 0-5
  }

  // Método para actualizar listas de palabras prohibidas
  async updateBlacklist(): Promise<void> {
    if (!this.config.enableAutoUpdate) return;

    try {
      // En producción, obtener desde API o base de datos
      this.logger.log('info', 'Actualización de lista negra iniciada');
      
      // Simular actualización
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      this.logger.log('info', 'Lista negra actualizada exitosamente');
    } catch (error) {
      this.logger.log('error', 'Error actualizando lista negra');
    }
  }
}

// Función helper para validación enterprise
export const createEnterpriseValidator = (config?: Partial<EnterpriseValidationConfig>) => {
  const fullConfig = { ...defaultEnterpriseConfig, ...config };
  const service = new EnterpriseValidationService(fullConfig);
  const logger = ValidationLogger.getInstance();

  return {
    validate: async (text: string) => {
      const startTime = Date.now();
      
      // Validación local rápida
      if (text.length > fullConfig.maxInputLength) {
        logger.log('warn', 'Input demasiado largo', text);
        return { isValid: false, reason: 'input_too_long' };
      }

      // Validación externa si está habilitada
      if (fullConfig.enableExternalValidation) {
        const externalResult = await service.validateWithExternalService(text);
        if (!externalResult.isSafe) {
          logger.log('warn', 'Amenaza detectada por servicio externo', text, externalResult.detectedThreats);
          return { isValid: false, reason: 'external_threat_detected' };
        }
      }

      const validationTime = Date.now() - startTime;
      if (validationTime > fullConfig.maxValidationTime) {
        logger.log('warn', 'Validación tardó demasiado', text);
      }

      return { isValid: true };
    },
    
    getLogs: () => logger.getLogs(),
    updateBlacklist: () => service.updateBlacklist()
  };
}; 