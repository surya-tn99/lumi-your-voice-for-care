export interface User {
  id: string;
  name: string;
  phone: string;
  age: number;
  bloodGroup: string;
  address: string;
  healthIssues: string[];
}

export interface Nominee {
  id: string;
  name: string;
  relationship: string;
  phone: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  scheduledTime: string;
  status: 'taken' | 'pending' | 'missed';
  takenAt?: string;
}

export interface EmergencyStatus {
  isActive: boolean;
  stage: 'none' | 'voice_alert' | 'waiting_response' | 'notifying_relatives' | 'calling_ambulance';
  lastEmergencyTime?: string;
  triggeredBy?: 'voice' | 'manual' | 'no_response';
}

export interface VoiceCommand {
  text: string;
  timestamp: string;
  action?: string;
  response?: string;
}
