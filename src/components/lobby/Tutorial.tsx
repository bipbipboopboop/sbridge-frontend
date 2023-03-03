const Tutorial = () => {
  return (
    <div className="nes-container is-dark with-title" style={{ height: "90%" }}>
      <p className="title">Tutorial</p>
      <div style={{ maxHeight: "100%", overflow: "scroll" }}>
        <p>S-Bridge, is a variation of Contract Bridge.</p>
        <p>S-Bridge can be broken down into 2 phases:</p>
        <p>Phase 1 : Bidding</p>
        <p>Phase 2 : Trick Taking</p>
        <br />
        <p>Bidding Phase:</p>
        <p>
          Each player take turn bidding for the trump suit(or the highest suit).
        </p>
        <p>When it's your turn, you can either bid higher, or pass</p>
        <p>
          This determines the trump suit and how many tricks needed to win the
          game.
        </p>
        <p>
          It ends with the successful bidder calling a card, whose owner will be
          the bidder's teammate.
        </p>
        <br />
        <p>Trick Taking Phase:</p>
        <p>In each round(trick),each player takes turns to play a card. </p>
        <p>Players must play a card of that suit, unless none are available.</p>
        <p>The player with the highest-ranked card wins the trick.</p>
        <p>
          The bidder's team must win the number called + 6 tricks to win the
          game.
        </p>
        <p>
          For example, if you bid for 2 Spades, and all 3 subsequent bids are
          passes, then you would have won the bid at the value 2 with trump suit
          of Spade. You can then proceed to call a card and whoever has that
          card would be your teammate. Since your bid has value 2, your team
          would have to win 2 + 6 = 8 tricks, where as the defending team would
          have to win only 13 - 8 = 5 tricks.
        </p>
      </div>
    </div>
  );
};

export default Tutorial;
