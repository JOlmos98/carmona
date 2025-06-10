export const getAudioPath = async (filename: string): Promise<string> => {
    if (process.env.NODE_ENV === "development") {
        return `/sounds/${filename}`;
    } else {
        const { join, resourceDir } = await import("@tauri-apps/api/path");
        const dir = await resourceDir();
        const fullPath = await join(dir, `public/sounds/${filename}`);
        return `file://${fullPath}`;
    }
};

//! ERROR

