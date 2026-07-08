import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface StudioProject {
  _id: string;
  name: string;
  description?: string;
  originalImage: string;
  enhancedImage?: string;
  productType?: string;
  productAttributes?: {
    colors?: string[];
    shape?: string;
    material?: string;
    estimatedDimensions?: string;
    features?: string[];
    style?: string;
  };
  status: 'draft' | 'processing' | 'complete' | 'error';
  createdAt: string;
  updatedAt: string;
  assetCount?: number;
}

export interface GeneratedAsset {
  _id: string;
  projectId: string;
  moduleId: string;
  type: 'image' | 'text' | 'json' | 'zip';
  label: string;
  content: string;
  metadata?: Record<string, unknown>;
  format?: string;
  createdAt: string;
}

type ModuleStatus = 'idle' | 'loading' | 'success' | 'error';

interface ModuleStates {
  upload: ModuleStatus;
  enhance: ModuleStatus;
  scene: ModuleStatus;
  naming: ModuleStatus;
  content: ModuleStatus;
  amazon: ModuleStatus;
  flipkart: ModuleStatus;
  seo: ModuleStatus;
  marketing: ModuleStatus;
  keywords: ModuleStatus;
  pricing: ModuleStatus;
}

interface StudioStore {
  // Current active project
  activeProject: StudioProject | null;
  setActiveProject: (project: StudioProject | null) => void;

  // Projects list
  projects: StudioProject[];
  setProjects: (projects: StudioProject[]) => void;
  addProject: (project: StudioProject) => void;
  updateProject: (id: string, updates: Partial<StudioProject>) => void;

  // Generated assets for active project
  assets: Record<string, GeneratedAsset[]>; // keyed by moduleId
  setModuleAssets: (moduleId: string, assets: GeneratedAsset[]) => void;
  addAsset: (asset: GeneratedAsset) => void;
  clearAssets: () => void;

  // Module loading states
  moduleStatus: ModuleStates;
  setModuleStatus: (module: keyof ModuleStates, status: ModuleStatus) => void;
  resetAllModuleStatus: () => void;

  // Active sidebar tab
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Sidebar collapsed state
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;

  // Launch kit progress
  launchKitProgress: {
    running: boolean;
    completedModules: string[];
    totalModules: number;
    errors: Record<string, string>;
  };
  setLaunchKitProgress: (progress: Partial<StudioStore['launchKitProgress']>) => void;
  resetLaunchKit: () => void;
}

const DEFAULT_MODULE_STATES: ModuleStates = {
  upload: 'idle',
  enhance: 'idle',
  scene: 'idle',
  naming: 'idle',
  content: 'idle',
  amazon: 'idle',
  flipkart: 'idle',
  seo: 'idle',
  marketing: 'idle',
  keywords: 'idle',
  pricing: 'idle',
};

export const useStudioStore = create<StudioStore>()(
  persist(
    (set) => ({
      activeProject: null,
      setActiveProject: (project) => set({ activeProject: project }),

      projects: [],
      setProjects: (projects) => set({ projects }),
      addProject: (project) =>
        set((state) => ({ projects: [project, ...state.projects] })),
      updateProject: (id, updates) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p._id === id ? { ...p, ...updates } : p
          ),
          activeProject:
            state.activeProject?._id === id
              ? { ...state.activeProject, ...updates }
              : state.activeProject,
        })),

      assets: {},
      setModuleAssets: (moduleId, assets) =>
        set((state) => ({ assets: { ...state.assets, [moduleId]: assets } })),
      addAsset: (asset) =>
        set((state) => ({
          assets: {
            ...state.assets,
            [asset.moduleId]: [
              ...(state.assets[asset.moduleId] || []),
              asset,
            ],
          },
        })),
      clearAssets: () => set({ assets: {} }),

      moduleStatus: DEFAULT_MODULE_STATES,
      setModuleStatus: (module, status) =>
        set((state) => ({
          moduleStatus: { ...state.moduleStatus, [module]: status },
        })),
      resetAllModuleStatus: () =>
        set({ moduleStatus: DEFAULT_MODULE_STATES }),

      activeTab: 'dashboard',
      setActiveTab: (tab) => set({ activeTab: tab }),

      sidebarCollapsed: false,
      setSidebarCollapsed: (collapsed) =>
        set({ sidebarCollapsed: collapsed }),

      launchKitProgress: {
        running: false,
        completedModules: [],
        totalModules: 8,
        errors: {},
      },
      setLaunchKitProgress: (progress) =>
        set((state) => ({
          launchKitProgress: { ...state.launchKitProgress, ...progress },
        })),
      resetLaunchKit: () =>
        set({
          launchKitProgress: {
            running: false,
            completedModules: [],
            totalModules: 8,
            errors: {},
          },
        }),
    }),
    {
      name: 'siphorahq-studio',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        activeProject: state.activeProject,
        sidebarCollapsed: state.sidebarCollapsed,
        activeTab: state.activeTab,
      }),
    }
  )
);
