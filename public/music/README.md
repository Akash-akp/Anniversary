# Music Files

To add your own romantic music to the anniversary app:

1. **Add your music file** to this `/public/music/` folder
   - Supported formats: MP3, OGG, WAV
   - Recommended: MP3 for best browser compatibility
   - File size: Keep under 10MB for faster loading

2. **Update the music URL** in `/src/components/MusicPlayer.tsx`
   - Find the line: `const musicUrl = "..."`
   - Replace with: `const musicUrl = "/music/your-song-name.mp3"`

3. **Romantic Song Suggestions:**
   - "All of Me" by John Legend
   - "Perfect" by Ed Sheeran
   - "A Thousand Years" by Christina Perri
   - "Thinking Out Loud" by Ed Sheeran
   - "Make You Feel My Love" by Adele
   - Any romantic instrumental music

4. **Copyright Notice:**
   - Make sure you have the right to use the music
   - For personal use, most songs are fine
   - For public sharing, consider royalty-free music

## Current Setup
The app currently uses a placeholder sound. Replace it with your chosen romantic song for the full experience!