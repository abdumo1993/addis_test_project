Product Requirement: Songs - Homepage

Purpose: To provide users with an engaging list of songs, showcasing properties such as title, artist, album, and genre along with relevant statistics.

UI Components:
- Filtering tab for sorting songs by genre, artist, and album
- Infinitely scrollable list of songs
- Sidebar with statistics, including total numbers of songs, albums, and top genres, with "see more" functionality
- Song management options: update, delete/remove with confirmation
- Create song button for adding new songs

Visual Style:
- Theme: Light theme with optional dark mode
- Primary color: Indigo #6366F1
- Secondary color: Purple #8B5CF6
- Accent color: Cyan #06B6D4
- Error/Alert: Red #DF3F40
- Spacing: Consistent 20px outer padding, 16px gutter spacing between items
- Borders: 1px solid light gray #E3E6EA on cards and input fields; slightly rounded corners (4px radius)
- Typography: Sans-serif, medium font weight (500) for headings, regular (400) for body, base size 16px
- Icons/images: Simple, filled vector icons for navigation and actions; illustrative flat images for empty states



components
topbar
    -title/name
    -page name
    - library/statistics buttons
side bar(home)
    -text (statistics Upper)
    -cards
        - title
        - subtitle
    -section
        - list
            -tiles 2x
                -name
                -number
main(home)
    - filter/search/addsong 
    - list
        - tiles(songs)
            -image
            -div
                -title
                -subtitle(artist * album)
                -subsubtitle (genre)
            -div
                -edit
                -delete
    

side bar(stats)
    -div 
        -text (statistics Upper)
        -list
            - tile
                -icon
                -ttile
    -div 
        -text (quick stats Upper)
        -list
            -cards
                - title
                - subtitle


main(stats)
    - flex 
        -cards
            -icon
            -title
            -subtitle
    - section
        -grid (2 col)
            - tile
                - icon
                - div
                    - title
                    - subtitle
                - div
                    - title (number)
                    - subtitle

add song popup
    -tile
        - title
        - input field
    - tile special
        - title
        - searchable dropdown
    - flex
        - button 2x