import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-envelope',
  templateUrl: './envelope.component.html',
  styleUrls: ['./envelope.component.scss']
})
export class EnvelopeComponent implements OnInit, OnDestroy {

  envelopeBack;
  envelopeOpening;
  envelopeFront;
  envelopeMessage;
  envelopeGlow;
  displayMessage;
  envelopeMessageArea;
  smallQuote;
  messageQuote;
  messageAuthor;

  quotes;
  colors;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {

    if (!JSON.parse(localStorage.getItem('envelope-login'))) {
      return this.router.navigateByUrl('/login');
    }

    this.envelopeBack = document.querySelector(".envelope-back");
    this.envelopeOpening = document.querySelector(".envelope-opening");
    this.envelopeFront = document.querySelector(".envelope-front");
    this.envelopeMessage = document.querySelector(".envelope-message");
    this.envelopeGlow = document.querySelector(".envelope-shadow");
    this.displayMessage = document.querySelector(".display-message");
    this.envelopeMessageArea = document.querySelector(".envelope-message-area");
    this.smallQuote = document.querySelector(".small-quote");
    this.messageQuote = document.querySelector(".quote");
    this.messageAuthor = document.querySelector(".author");

    this.quotes = [{
      quote: "Stay hungry. Stay foolish.",
      author: "Steve Jobs",
      tag: "life"
    }];

    this.colors = {
      hope: {
        envBack: "#bac6bf",
        envMessage: "#ee5252",
        envMsgBorder: "#da4848",
        envOpening: "#DAEDE2",
        envFront: "#DAEDE2"
      },
      science: {
        envBack: "#c63e30",
        envMessage: "#2C3E50",
        envMsgBorder: "#21303e",
        envOpening: "#E74C3C",
        envFront: "#E74C3C"
      },
      life: {
        envBack: "#332532",
        envMessage: "#FF974F",
        envMsgBorder: "#F77A52",
        envOpening: "#644D52",
        envFront: "#644D52"
      },
      success: {
        envBack: "#1B1D26",
        envMessage: "#BFBD9F",
        envMsgBorder: "#aaa88d",
        envOpening: "#425955",
        envFront: "#425955"
      },
      inspirational: {
        envBack: "#1C0C19",
        envMessage: "#CC4452",
        envMsgBorder: "#723147",
        envOpening: "#31152B",
        envFront: "#31152B"
      },
      happiness: {
        envBack: "#1C1D21",
        envMessage: "#445878",
        envMsgBorder: "#394a66",
        envOpening: "#31353D",
        envFront: "#31353D"
      }
    };
  }

  closeMessage() {
    this.displayMessage.classList.remove("view-message");
    this.messageQuote.style.fontSize = "0";
    this.messageAuthor.style.fontSize = "0";
  }

  showMessage() {
    this.displayMessage.classList.add("view-message");
    this.messageQuote.style.fontSize = "20px";
    this.messageAuthor.style.fontSize = "16px";
  }

  envelopeColor(frontColor, backColor, msgColor, msgBorderColor, opnColor) {
    this.envelopeFront.style.borderLeftColor = frontColor;
    this.envelopeFront.style.borderRightColor = frontColor;
    this.envelopeFront.style.borderBottomColor = frontColor;
    this.envelopeBack.style.background = backColor;
    this.envelopeMessage.style.background = msgColor;
    this.envelopeMessage.style.borderColor = msgBorderColor;
    this.displayMessage.style.background = msgColor;
    this.displayMessage.style.borderColor = msgBorderColor;
    this.envelopeOpening.style.borderTopColor = opnColor;
  }

  openEnvelope() {
    this.envelopeOpening.classList.toggle("open-envelope");
    this.envelopeMessage.classList.toggle("push-message");
    this.envelopeGlow.classList.toggle("envelope-glow");
    this.envelopeMessageArea.classList.toggle("envelope-msg-area-show");
  }

  public ngOnDestroy() {
    localStorage.removeItem("envelope-login");
  }

}
