import { analytics } from "./firebaseApp";
export function setUser(uid: string, isAnonymous: boolean) {
    analytics.setUserId(uid);
    analytics.setUserProperties({
        'anonymous': isAnonymous
    })
}

class Event {
    /**
     * Expected User Journer for Voters
     * 
     * Land on Poll Page => View Poll => Click on Option to Vote => Vote Added Successfully to Poll => Share Poll With Someone
     * 
     */




    viewPoll(pollId: string) {
        analytics.logEvent("view_poll", {
            id: pollId
        })
    }

    addVote(pollId: string, optionId: string) {
        analytics.logEvent("add_vote", {
            id: pollId,
            optionId: optionId
        })
    }

    voteAdded(pollId: string, optionId: string) {
        analytics.logEvent("vote_added", {
            id: pollId,
            optionId: optionId
        });
    }

    sharePoll(pollId: string, shareMethod?: string) {
        analytics.logEvent("share_poll", {
            id: pollId,
            method: shareMethod
        })
    }

    viewPollReport(pollId: string) {
        analytics.logEvent('view_poll_report', {
            id: pollId
        })
    }

    createPoll(type: string) {
        analytics.logEvent("create_poll", {
            type: type
        })
    }
    deleteOption() {
        analytics.logEvent("delete_option");
    }
    addOptionImage() {
        analytics.logEvent("add_image", {
            type: "option_image"
        })
    }
    pollCreated(pollId: string) {
        analytics.logEvent("poll_created", {
            id: pollId
        })
    }

    clientError(error: any) {
        try {

            analytics.logEvent("client_error", { ...error });
        } catch (error) {

        }
    }
}

export class EventProxy {
    get(target: any, prop: any, receiver: any) {
        const env = process.env.NODE_ENV;
        if (env == "development") return () => {
            console.log("Events Disabled in development Mode");
        };
        return Reflect.get(target, prop, receiver);
    }
}

export default new Proxy(new Event(), new EventProxy()) as Event;