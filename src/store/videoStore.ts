import create from 'zustand';

interface VideoUrlStoreState {
  videoUrls: string[];
  blobed:Blob[];
  loading: boolean;
  setVideoUrls: (videoUrls: string[]) => void;
  setBlobed: (videoUrls: Blob[]) => void;
  setLoading: (loading: boolean) => void;
} 
const useVideoUrlStore = create<VideoUrlStoreState>((set) => ({
  videoUrls: [],
  blobed:[],
  loading: true,
  setVideoUrls: (videoUrls) => {
    localStorage.setItem('videoUrls', JSON.stringify(videoUrls));
    set({ videoUrls });
  },
  setBlobed: (blobed) => set({ blobed }),
  setLoading: (loading) => set({ loading }),
}));

export default useVideoUrlStore;
