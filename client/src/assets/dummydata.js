import png from "./react.svg";
import png2 from "./evillarry.png";

export const RawPlayerData = [{
    PlayerId : "1",
    Name:"ok",
    Password:"password",
    EMail:"ahhahahaha@fakeemail.gov.qq",
    Date:"9.2.1691"
},
{
    PlayerId : "2",
    Name:"notok",
    Password:"password2",
    EMail:"ahhahahaha@fakeemail2.gov.qq",
    Date:"9.2.2025"
},
{
    PlayerId:"0",
    Name:"Evil Larry",
    Password:"evil4life",
    EMail:"evillarry@mau.mau",
    Date:"30.1.2025"
}]

export const RawStats = [{
    PlayerId:"1",
    TotalMatches:"999",
    WonMatches:"1",
    StalemateMatches:"1",
    AIForfeit:"0",
    CurrentELO:"0",
    HighestELO:"-1000",
    CheckmatePiece:"Rook"
},
{
    PlayerId:"2",
    TotalMatches:"999",
    WonMatches:"703",
    StalemateMatches:"99",
    AIForfeit:"10",
    CurrentELO:"5617",
    HighestELO:"1000",
    CheckmatePiece:"Pawn"
},
{
    PlayerId:"0",
    TotalMatches:"1000",
    WonMatches:"999",
    StalemateMatches:"1",
    AIForfeit:"400",
    CurrentELO:"1800",
    HighestELO:"2147483647",
    CheckmatePiece:"King"
}
]

export const RawSettings = [{
    PlayerId:"1",
    BoardStyle:"default",
    LDMode:"dark",
    ProfilePic: png
},
{
    PlayerId:"2",
    BoardStyle:"default",
    LDMode:"dark",
    ProfilePic: png
},
{
    PlayerId:"0",
    BoardStyle:"default",
    LDMode:"dark",
    ProfilePic: png2,
    ShowProfileStats: {
        ShowElo: true,
        ShowWL:true,
        ShowDate:true
    }

}]

