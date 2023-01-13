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
            optionId
        })
    }

    voteAdded(pollId: string, optionId: string) {
        analytics.logEvent("vote_added", {
            id: pollId,
            optionId
        });
    }

    sharePoll(pollId: string, shareMethod?: string) {
        analytics.logEvent("share_poll", {
            id: pollId,
            shareMethod
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

    pollCreated(pollId: string) {
        analytics.logEvent("poll_created", {
            id: pollId
        })
    }
}

export default new Event();